async function savetocloud(event){
    event.preventDefault();
    const signinDetails={
  email: event.target.email.value,
  
    }
    console.log(signinDetails)
  
  
  
  let serilized_Obj = JSON.stringify(signinDetails);
  
  const response= await axios.post("http://localhost:3000/password/forgotpassword",signinDetails)
  .then((Response)=>{
    if(Response.status === 202){
      window.open(`http://localhost:3000/password/resetpassword/${Response.data.Id}`);
      document.body.innerHTML += '<div style="color:red;text-align:center;margin-top:70px;">Mail Successfuly sent <div>'
  }else {
      throw new Error('Something went wrong!!!')
  }
  
  })
  
  .catch((err)=>{
      document.body.innerHTML+=`<div style="color:red;">${err}<div>`
  })
  
  }