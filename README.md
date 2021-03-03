# ⏲️ Clock IT ⏲️
Meu código em Node.js pra bater meu ponto (**MeuRH TOTVS**) automaticamente.

O script roda automaticamente as 09h00 e 18h00, de segunda a sexta.

Como experimento, deixo ele rodando no meu **RaspberryPi**. Você pode usar algo parecido ou deixar o script rodando no *boot* do seu OS.

Ao iniciar, o script vai enviar logs de mensagem no seu **Telegram** através de um bot. Você pode enviar mensagem pro bot pra ter certeza de que ele ainda está rodando (ele vai responder). Se algum problema fizer o script parar de rodar, o bot também avisará.

# Requerimentos:
- **Node.js** e **NPM** instalado.

# Setup:

- Crie uma chave de API do Telegram: https://t.me/botfather
- Duplique o arquivo ```.env.sample``` como .env com seus dados.
- ```npm install```

# Para rodar:
``` sh
node script.js
```

# LINUX: Para instalar o script como serviço (rodar automaticamente no boot):

- Crie o arquivo ```/etc/systemd/system/clockit.service``` com o seguinte conteúdo (substituindo o caminho em ```ExecStart``` e ```WorkingDirectory``` para o equivalente no seu computador):

```
[Unit]
Description=Clock IT

[Service]
ExecStart=/home/kali/clockit/script.js
Restart=always
User=nobody
Group=nogroup
Environment=PATH=/usr/bin:/usr/local/bin
Environment=NODE_ENV=production
WorkingDirectory=/home/kali/clockit

[Install]
WantedBy=multi-user.target
```

- Dê permissão de execução no arquivo: ```chmod +x script.js```

- Inicie com: ```systemctl start clockit```.

- Habilite pra rodar no boot com: ```systemctl enable clockit```.

See logs with ```journalctl -u clockit```