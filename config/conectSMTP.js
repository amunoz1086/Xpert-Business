const nodemailer = require('nodemailer');
const nodeEmail = smtpConnect();

function smtpConnect() {

    const HOST_MAIL = process.env.MAIL_HOST;
    const PORT_MAIL = process.env.MAIL_PORT;
    const SECURE_MAIL = process.env.MAIL_SECURE;

    const USER_MAIL_STATUS = valEncode(process.env.MAIL_USER);
    const PASS_MAIL_STATUS = valEncode(process.env.MAIL_PASS);

    let USER_MAIL;
    let PASS_MAIL;

    if (USER_MAIL_STATUS) {
        USER_MAIL = Buffer.from(process.env.MAIL_USER, 'base64').toString('utf-8');
    } else {
        USER_MAIL = process.env.MAIL_USER;
    };

    if (PASS_MAIL_STATUS) {
        PASS_MAIL = Buffer.from(process.env.MAIL_PASS, 'base64').toString('utf-8');
    } else {
        PASS_MAIL = process.env.MAIL_PASS;
    };

    try {
        const transporter = nodemailer.createTransport({
            host: HOST_MAIL,
            port: PORT_MAIL,
            secure: SECURE_MAIL == 1,
            auth: {
                user: USER_MAIL,
                pass: PASS_MAIL
            }
        });

        return transporter;

    } catch (error) {
        console.error(error);
    };
};

export { nodeEmail };


function valEncode(data) {
    try {

        const dCode = atob(data);
        const eCode = Buffer.from(dCode).toString('base64');
        return eCode === data;

    } catch (error) {
        return true;
    };
};