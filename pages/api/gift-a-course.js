import mailer from "@/utils/mailer";
import initMiddleware from "@/lib/init-middleware";
import Cors from "cors";
import { referrals as Referral } from '@/models/index'

// Initialize the cors middleware
const cors = initMiddleware(
  // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
  Cors({
    // Only allow requests with GET, POST and OPTIONS
    methods: ['GET', 'POST', 'OPTIONS', 'DELETE', 'PUT']
  })
)

export default async (req, res) => {
  await cors(req, res);

  // console.log(req.body)
  const { name, email, number, friendName, friendEmail, friendNumber, text } = req.body
  const supportEmail = 'support@brainlox.com'

  const dataForSupport = {
    email: supportEmail,
    subject: 'Gift a Course request',
    // text: text,
    html: `
            Hello! <br/>
            We have received a new request to gift a course. Details are as follows: <br/>
            <b>Sender Name: </b> ${name} <br /> 
            <b>Sender Email Id:</b> ${email} <br /> 
            <b>Sender phone:</b> ${number} <br /> 
            <b>Sender Message:</b> ${text} <br/>
            <b>Receiver Name:</b> ${friendName} <br/>
            <b>Receiver email id:</b> ${friendEmail} <br/> 
            <b>Receiver phone:</b> ${friendNumber} <br/>
            <br/>
            Please do the needful <br/>
            Thank you  
        `
  }

  const dataForSender = {
    email,
    subject: 'Brainlox: Thank you for gifting a course.',
    // text: text,
    html: `
            Hello! <br/>
            <b>You are gifting course(s) to : </b> ${friendName} <br /> 
            Our team at Brainlox will reach you and help you to gift the course.<br/>
            Thank you  
        `
  }

  const dataForReceiver = {
    email: friendEmail,
    subject: 'Brainlox: Your friend gifted a course!!',
    html: `
            Hello! <br/>
            ${name} gifted a course to you in Brainlox. <br/>
            Our team at Brainlox will reach you and help you to get your course. <br/>
            Thank you  
        `
  }

  try{
    const giftCourseReferral = await Referral.create({
      sender_name: name,
      sender_email: email ,
      sender_phone: number,
      receiver_name: friendName,
      receiver_email: friendEmail,
      receiver_phone: friendNumber,
      msg_from_sender: text,
      medium: 'gift-a-course',
    })

    // res.send('Data saved successfully.')
    // console.log(giftCourseReferral)
    // res.status(200).send('Data saved successfully.')

    await(mailer(dataForSupport) && mailer(dataForSender) && mailer(dataForReceiver))
    // console.log(response)
    res.status(200).send('Email sent successfully')
  } catch (error) {
    console.log(error)
    res.status(500).send('Error sending email')
  }
  
  
}