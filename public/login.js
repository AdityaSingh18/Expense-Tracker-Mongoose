async function savetocloud(event){
    event.preventDefault();
    const signinDetails={
  email: event.target.email.value,
  password: event.target.password.value
  
    }
    console.log(signinDetails)
  
  
  
  let serilized_Obj = JSON.stringify(signinDetails);
  
  const response= await axios.post("http://localhost:3000/user/login",signinDetails)
  .then((Response)=>{
    if(Response.status===200){
      console.log(Response)
      alert('login sucessfull')
      localStorage.setItem('token',Response.data.token)
      localStorage.setItem('user' , Response.data.isPremium)
      window.location.href='./expense.html'
    }

    if(Response.status===401){
        console.log(Response)
        alert('user not authorized')
      }

      if(Response.status===404){
        console.log(Response)
        alert('User not found')
      }
    else{
        throw new Error('Failed to Login')
    }
  
  })
  
  .catch((err)=>{
      document.body.innerHTML+=`<div style="color:red;">${err}<div>`
  })
  
  }