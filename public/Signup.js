 async function savetocloud(event){
    event.preventDefault();
    const signupDetails={
  name :event.target.name.value,
  email: event.target.email.value,
  password: event.target.password.value
  
    }
    console.log(signupDetails)
  
  
  
  let serilized_Obj = JSON.stringify(signupDetails);
  
  const response= await axios.post("http://localhost:3000/user/signup",signupDetails)
    console.log(response)
    if(response.status===201){
      console.log("if is working"+Response)
      alert('SignUp Successful')
      window.location.href='./login.html' 
    }
    else{
        throw new Error('Failed to Logi')
    }
  
  
  re
  .catch((err)=>{
      document.body.innerHTML+=`div style="color:red;">${err}<div>`
  })
  
  }