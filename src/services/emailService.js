require('dotenv').config();
import nodemailer from 'nodemailer';
let sendSimpleEmail = async(dataSend) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_APP,
            pass: process.env.EMAIL_APP_PASSWORD,
        },
    });
    let info = await transporter.sendMail({
        from:'"Phúc vnua" <baophucta2k@gmail.com>',
        to: dataSend.receiverEmail,
        subject: "Thông tin đặt lịch khám bệnh cho cây",
        html: getBodyHTMLEmail(dataSend),
     


    });
}
let getBodyHTMLEmail = (dataSend) => {
    let result = ''
    if(dataSend.language === 'vi'){
        result =
        `
        <h3> Xin chào ${ dataSend.patientName } !</h3 >
        <p>Bạn nhận được thư này vì đã đặt lịch khám bệnh online trên web khamchuabenhchocayvnua</p>
     <p>Thông tin đặt lịch khám bệnh:</p>
        <div><b>Thời gian: ${dataSend.time}</b></div>
        <div><b>Bác sĩ: ${dataSend.doctorName}</b></div>
        <div><b>Lý do của khách hàng đưa ra: ${dataSend.reasons}</b></div>
        <p>Nếu các thông tin trên là đúng sư thật, vui lòng click vào đường link bên dưới
        để xác nhận và hoàn tất thủ tục đặt lịch khám bệnh.</p>
        <div>
        <a href=${dataSend.redirectLink} target="_blank">Click here</a>
        </div>
<div>Bạn có thể quản lý lịch khám bệnh cho cây của mình qua mục quản lý tài khoản sau khi xác nhận lịch khám bệnh cho cây</div>
         <div>Xin chân thành cảm ơn</div>
         `
        
    }
    if (dataSend.language === 'en') {
        result =
            `
        <h3> Hello ${dataSend.patientName} !</h3 >
        <p>You received this message because you booked an online medical appointment on web khamchuabenhchocayvnua</p>
     <p>Information to book a medical appointment:</p>
        <div><b>Time: ${dataSend.time}</b></div>
        <div><b>Doctor: ${dataSend.doctorName}</b></div>
        <div><b>Reasons from customer: ${dataSend.reasons}</b></div>
        <p>If the above information is correct, please click on the link below to confirm and complete the medical appointment booking procedure.</p>
        <div>
        <a href=${dataSend.redirectLink} target="_blank">Click here</a>
        </div>
        <div>You can manage your tree's medical schedule through the account management section after confirming the schedule of medical examination for the tree</div>
         <div>Thank you</div>
         `

    }
    return result;
}
let getBodyHTMLEmailRemedy = (dataSend) => {
    let result = ''
    if (dataSend.language === 'vi') {
        result =
            `
        <h3> Xin chào ${dataSend.patientName} !</h3 >
        <p>Bạn nhận được thư này vì đã đặt lịch khám bệnh online trên web khamchuabenhchocayvnua</p>
     <p>Thông tin đặt lịch khám bệnh/ hóa đơn đã được gửi trong file đính kèm</p>
       
         <div>Xin chân thành cảm ơn!</div>

         `

    }
    if (dataSend.language === 'en') {
        result =
            `
        <h3> Hello ${dataSend.patientName} !</h3 >
        <p>You received this message because you booked an online medical appointment on web khamchuabenhchocayvnua</p>
     <p>Information to book a medical appointment/Invoice has been sent in attachment</p>
        
         <div>Thank you!</div>
         `

    }
    return result;
}
let getBodyHTMLEmailCancelRemedy = (dataSend) => {
    let result = ''
    if (dataSend.language === 'vi') {
        result =
            `
        <h3> Xin chào ${dataSend.patientName} !</h3 >
        <p>Bạn nhận được thư này vì đã đặt lịch khám bệnh online trên web khamchuabenhchocayvnua</p>
     <p>Rất tiếc nhưng hiện tại bác sĩ/phòng khám của chúng tôi không thể xử lý yêu cầu khám bệnh của quý khách đúng hẹn. Qúy khách có thể đặt lịch khám bệnh cho cây vào thời điểm hoặc bác sĩ khác có trên website. Mong quý khách thông cảm</p>
     <p>Lý do: Bác sĩ đã kín lịch hẹn vào thời gian này</p>
       <div>Bạn có thể quản lý lịch khám bệnh cho cây của mình qua mục quản lý tài khoản</div>
         <div>Xin chân thành cảm ơn!</div>

         `

    }
    if (dataSend.language === 'en') {
        result =
            `
        <h3> Hello ${dataSend.patientName} !</h3 >
        <p>You received this message because you booked an online medical appointment on web khamchuabenhchocayvnua</p>
     <p>We're sorry, but our doctor/clinic is currently unable to process your request on time. You can schedule a medical examination for the tree at a time or another doctor available on the website. Wish you sympathize</p>
       <p>Reason: The doctor is full of appointments at this time</p>
        <div>You can manage your tree's medical schedule through the account management section</div>
         <div>Thank you!</div>
         `

    }
    return result;
}
let getBodyHTMLEmailCancelPatientRemedy = (dataSend) => {
    let result = ''
    if (dataSend.language === 'vi') {
        result =
            `
        <h3> Xin chào ${dataSend.patientName} !</h3 >
        <p>Bạn nhận được thư này vì đã đặt lịch khám bệnh online trên web khamchuabenhchocayvnua</p>
     <p>Bạn đã hủy lịch hẹn khám thành công! Rất mong được phục vụ bạn lần sau!</p>
     
       <div>Bạn có thể quản lý lịch khám bệnh cho cây của mình qua mục quản lý tài khoản</div>
         <div>Xin chân thành cảm ơn!</div>

         `

    }
    if (dataSend.language === 'en') {
        result =
            `
        <h3> Hello ${dataSend.patientName} !</h3 >
        <p>You received this message because you booked an online medical appointment on web khamchuabenhchocayvnua</p>
     <p>You have successfully canceled your appointment! Looking forward to serving you next time!</p>
     
        <div>You can manage your tree's medical schedule through the account management section</div>
         <div>Thank you!</div>
         `

    }
    return result;
}
let getBodyHTMLEmailReRemedy = (dataSend) => {
    let result = ''
    if (dataSend.language === 'vi') {
        result =
            `
        <h3> Xin chào ${dataSend.patientName} !</h3 >
        <p>Bạn nhận được thư này vì đã thanh toán và nhận được phiếu khám thành công khi tới cơ sở chăm sóc cây trồng</p>
     <p>Rất tiếc!Bác sĩ của chúng tôi chưa thể khám cho cây của bạn như đúng hẹn</p>
     <p>Lý do: Bác sĩ có việc đột xuất</p>
     <p>Đừng lo lắng. Hãy giữ lại phiếu khám. Bạn có thể đăng kí lại vào thời gian khác và được khám lại cho cây miễn phí vào lần sau</p>
     <p>Nếu bạn muốn hoàn tiền,hãy giữ lại phiếu khám, biên lai thu tiền, và hãy liên hệ với chúng tôi trong thời gian sớm nhất. Rất hân hạnh được phục vụ</p>
     <p>Hotline: 0981943577 - Email hỗ trợ: phuclongchausa912@gmail.com</p>
       <div>Bạn có thể quản lý lịch khám bệnh cho cây của mình qua mục quản lý tài khoản</div>
         <div>Xin chân thành cảm ơn!</div>

         `

    }
    if (dataSend.language === 'en') {
        result =
            `
      <h3> Hello ${dataSend.patientName} !</h3 >
         <p>You received this letter because you paid and received a successful medical checkup when you went to the plant care facility</p>
      <p>Sorry!Our doctor could not examine your tree as scheduled</p>
      <p>Reason: The doctor has an unexpected job</p>
      <p>Don't worry. Please keep the exam sheet. You can re-register at another time and get a free tree check next time</p>
      <p>If you want a refund, please keep the medical record, the payment receipt, and contact us as soon as possible. Pleased to serve</p>
      <p>Hotline: 0981943577 - Support email: phuclongchausa912@gmail.com</p>
        <div>You can manage your tree's medical schedule through your account management</div>
          <div>Thank you very much!</div>
         `

    }
    return result;
}
let sendAttachment = async (dataSend) => {
    return new Promise(async (resolve, reject)=> {
        try{
            let transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false,
                auth: {
                    user: process.env.EMAIL_APP,
                    pass: process.env.EMAIL_APP_PASSWORD,
                }
            });
            let info = await transporter.sendMail({
                from: '"Team Tạ Bảo Phúc" <baophucta2k@gmail.com>',
                to: dataSend.email,
                subject: "Dear",
                html: getBodyHTMLEmailRemedy(dataSend),
                attachments: [
                    {
                        filename: `remedy-${dataSend.patientId}-${new Date().getTime()}.png`,
                        content: dataSend.imgBase64.split("base64,")[1],
                        encoding: 'base64'
                    }
                ]
            })
resolve(true)
        }catch(e){
            reject(e)

        }
    })
}
let sendCancelAttachment = async (dataSend) => {
    return new Promise(async (resolve, reject) => {
        try {
            let transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false,
                auth: {
                    user: process.env.EMAIL_APP,
                    pass: process.env.EMAIL_APP_PASSWORD,
                }
            });
            let info = await transporter.sendMail({
                from: '"Team Tạ Bảo Phúc" <baophucta2k@gmail.com>',
                to: dataSend.email,
                subject: "Dear",
                html: getBodyHTMLEmailCancelRemedy(dataSend)
            })
            resolve(true)
        } catch (e) {
            reject(e)

        }
    })
}
let sendCancelPatientAttachment = async (dataSend) => {
    return new Promise(async (resolve, reject) => {
        try {
            let transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false,
                auth: {
                    user: process.env.EMAIL_APP,
                    pass: process.env.EMAIL_APP_PASSWORD,
                }
            });
            let info = await transporter.sendMail({
                from: '"Team Tạ Bảo Phúc" <baophucta2k@gmail.com>',
                to: dataSend.email,
                subject: "Dear",
                html: getBodyHTMLEmailCancelPatientRemedy(dataSend)
            })
            resolve(true)
        } catch (e) {
            reject(e)

        }
    })
}
let sendReBooking = async (dataSend) => {
    return new Promise(async (resolve, reject) => {
        try {
            let transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false,
                auth: {
                    user: process.env.EMAIL_APP,
                    pass: process.env.EMAIL_APP_PASSWORD,
                }
            });
            let info = await transporter.sendMail({
                from: '"Team Tạ Bảo Phúc" <baophucta2k@gmail.com>',
                to: dataSend.email,
                subject: "Dear",
                html: getBodyHTMLEmailReRemedy(dataSend)
            })
            resolve(true)
        } catch (e) {
            reject(e)

        }
    })
}
module.exports = {
    sendSimpleEmail: sendSimpleEmail,
    sendAttachment: sendAttachment,
    sendCancelAttachment: sendCancelAttachment,
    sendCancelPatientAttachment: sendCancelPatientAttachment,
    sendReBooking: sendReBooking
}

