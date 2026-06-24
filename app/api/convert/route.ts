import CloudConvert from 'cloudconvert';
import { Readable } from 'stream';

const cloudConvert = new CloudConvert(process.env.CLOUDCONVERT_API_KEY!);

export async function POST(req: Request) {
  try {
    // Validar API Key
    if (!process.env.CLOUDCONVERT_API_KEY) {
      console.error('CLOUDCONVERT_API_KEY não definida');
      return new Response(JSON.stringify({ error: 'CLOUDCONVERT_API_KEY não configurada' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const formData = await req.formData();
    const docxFile = formData.get('file') as File;
    const fileName = formData.get('fileName') as string || 'document.docx';

    if (!docxFile) {
      return new Response(JSON.stringify({ error: 'Nenhum arquivo enviado' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    console.log('Iniciando conversão:', { fileName, fileSize: docxFile.size });

    // Converter File para Buffer
    const arrayBuffer = await docxFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Criar stream a partir do buffer
    const stream = Readable.from(buffer);

    // 1. Criar job de conversão
    console.log('Criando job CloudConvert...');
    const job = await (cloudConvert as any).jobs.create({
      tasks: {
        'import-file': {
          operation: 'import/upload',
        },
        'convert-file': {
          operation: 'convert',
          input: 'import-file',
          output_format: 'pdf',
        },
        'export-file': {
          operation: 'export/url',
          input: 'convert-file',
        },
      },
    });

    console.log('Job criado:', job.id);

    // 2. Upload do ficheiro DOCX
    const uploadTask = job.tasks.find((t: any) => t.name === 'import-file');

    if (!uploadTask) {
      console.error('Upload task não encontrada');
      return new Response(JSON.stringify({ error: 'Erro ao criar tarefa de upload' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    console.log('Enviando arquivo para CloudConvert via stream...');

    // Upload usando stream com tamanho especificado
    try {
      await (cloudConvert as any).tasks.upload(uploadTask, stream, fileName, buffer.length);
    } catch (uploadError) {
      console.error('Erro no upload:', uploadError);
      throw uploadError;
    }

    console.log('Arquivo enviado, aguardando conversão...');

    // 3. Esperar conclusão da conversão
    const finishedJob = await (cloudConvert as any).jobs.wait(job.id);

    console.log('Job concluído. Status:', finishedJob.status);
    console.log('Tasks:');
    finishedJob.tasks.forEach((t: any) => {
      console.log(`  - ${t.name}: ${t.status}${t.message ? ` (${t.message})` : ''}`);
      if (t.error) console.log(`    Error: ${JSON.stringify(t.error)}`);
    });

    // Verificar erros no job
    if (finishedJob.status === 'fail' || finishedJob.status === 'error') {
      console.error('Job falhou. Tasks com erro:');
      const failedTasks = finishedJob.tasks.filter((t: any) => t.status === 'error');
      failedTasks.forEach((t: any) => {
        console.error(`  ${t.name}: ${t.message}`);
        console.error(`    Code: ${t.code}`);
      });
      
      return new Response(JSON.stringify({ 
        error: 'Falha na conversão CloudConvert',
        jobStatus: finishedJob.status,
        details: failedTasks.map((t: any) => ({ name: t.name, message: t.message, code: t.code }))
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // 4. Obter URL do PDF
    const exportTask = finishedJob.tasks.find(
      (t: any) => t.operation === 'export/url' || t.name === 'export-file'
    );

    console.log('Export task status:', exportTask?.status);

    if (!exportTask || exportTask.status !== 'finished') {
      console.error('Export task não completada:', exportTask);
      return new Response(JSON.stringify({ 
        error: 'Task de export não concluída',
        taskStatus: exportTask?.status,
        message: exportTask?.message
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (!exportTask.result?.files?.[0]) {
      console.error('Nenhum arquivo no resultado:', exportTask.result);
      return new Response(JSON.stringify({ 
        error: 'Nenhum arquivo gerado',
        result: exportTask.result
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const pdfUrl = exportTask.result.files[0].url;
    console.log('PDF URL obtida:', pdfUrl);

    // 5. Fazer download da URL e retornar como buffer
    const pdfResponse = await fetch(pdfUrl);
    if (!pdfResponse.ok) {
      console.error('Erro ao fazer download do PDF:', pdfResponse.status, pdfResponse.statusText);
      return new Response(JSON.stringify({ error: 'Erro ao descarregar PDF convertido' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const pdfBuffer = await pdfResponse.arrayBuffer();
    const pdfFileName = fileName.replace('.docx', '.pdf');

    console.log('PDF gerado com sucesso:', pdfFileName, 'tamanho:', pdfBuffer.byteLength);

    return new Response(Buffer.from(pdfBuffer), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${pdfFileName}"`,
      },
    });
  } catch (error) {
    console.error('Erro na conversão CloudConvert:', error);
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido na conversão';
    const errorStack = error instanceof Error ? error.stack : '';
    
    console.error('Stack:', errorStack);
    
    return new Response(JSON.stringify({ 
      error: `Erro ao converter PDF: ${errorMessage}`,
      details: errorStack
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
