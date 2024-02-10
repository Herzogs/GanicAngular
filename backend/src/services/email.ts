import transporter from '../config/mail'

const enviarEmail = async (obj: any): Promise<void> => {
  console.log('Enviando email a ', obj.email)
  await transporter.sendMail({
    from: process.env.EMAIL_USER, // sender address
    to: obj.email, // list of receivers
    subject: obj.subject, // Subject line
    html: obj.html // html body
  }).catch((error) => {
    console.log(error)
    throw error
  })
}

export { enviarEmail }
