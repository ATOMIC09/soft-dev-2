// DO NOT MODIFY THIS FILE IF YOU ARE NOT IT OPERATIONS
const express = require('express');
const { BASE_SERVER_PATH, PORT } = require('./config');
const Sentry = require('@sentry/node')
const app = express();
const router = require('./server');

Sentry.init({
    dsn: "https://384213f7f34ec9e89507ec28fbb51094@linux-vm-southeastasia-3.southeastasia.cloudapp.azure.com/5",
    integrations: [
        new Sentry.Integrations.Http({ tracing: true }),
        new Sentry.Integrations.Express({ app }),
    ],
    tracesSampleRate: 1.0,
});
app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

app.use(BASE_SERVER_PATH, router);

app.use(Sentry.Handlers.errorHandler());
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
