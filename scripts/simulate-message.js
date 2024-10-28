const amqp = require('amqplib');

async function publishMessage() {
  try {
    const connection = await amqp.connect('amqp://user:password@127.0.0.1:5672');
    const channel = await connection.createChannel();

    const exchange = 'amq.topic';
    const routingKey = 'send_email'; // Deve coincidir com o @EventPattern('send_email')

    const message = {
      to: 'fmlima4@outlook.com.com',
      subject: 'Bem-vindo!',
      name: 'Felipe',
    };

    await channel.assertExchange(exchange, 'topic', { durable: true });
    channel.publish(exchange, routingKey, Buffer.from(JSON.stringify({ pattern: 'send_email', data:  message })));

    console.log(`Mensagem publicada: ${JSON.stringify(message)}`);

    setTimeout(() => {
      channel.close();
      connection.close();
    }, 500);
  } catch (err) {
    console.error('Erro ao publicar mensagem:', err);
  }
}

publishMessage();
