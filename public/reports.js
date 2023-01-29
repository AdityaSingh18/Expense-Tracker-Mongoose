let token = localStorage.getItem('token');
let listurl = document.getElementById('listurl-div');
let listno = 0 ;

window.addEventListener('DOMContentLoaded' , async(e)=>{
    e.preventDefault()
    try {
        let response = await axios.get('http://localhost:3000/expense/getAllDownloadUrl' , {headers: {Authorization: token}})
        if(response.status === 200){
            showUrls(response.data)
        }
    } catch (error) {
        
    }
})

document.getElementById('download').onclick = async function(e){
    e.preventDefault()
    try {
        let response = await axios.get('http://localhost:3000/expense/download' , {headers: {Authorization: token}})
        if(response.status === 200){
            showUrlOnscreen(response.data.downloadUrlData); 
            var a = document.createElement('a');
            a.href = response.data.fileURL;
            a.download = 'userExpense.csv';
            a.click();
        }
    } catch (err) {
        console.log(err)
    }
}

function showUrlOnscreen(data){
    let  child = `<li class="list" >
        <a href="${data.fileUrl}" class="expense-info">${listno + 1} ${data.fileName.split('/')[1]}</a>
    </li>`  

    listurl.innerHTML += child
}

function showUrls(data){
    listurl.innerHTML = ''
    data.urls.forEach(url => {
        let  child = `<li class="list" >
        <a href="${url.fileUrl}" class="expense-info">${listno + 1}. ${url.fileName.split('/')[1]}</a>
    </li>`  

    listurl.innerHTML += child

    listno++
    });
}
