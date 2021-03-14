// ############ LIsta de Cliente ################
const btnAddClient = document.getElementById("btn-add-client")
const inputSearchClient = document.getElementById("input-search-client")
const btnSearchClient = document.getElementById("btn-search-client")
const rowClients = document.getElementById("row-clients")

inputSearchClient.addEventListener('keyup',async (e) =>{
    e.preventDefault()
    rowClients.innerHTML =''
    const response = await fetch(`http://localhost:3000/api/v1/search/client?company=${inputSearchClient.value}&page=1`)
    const{ clients} = await response.json()

     clients.forEach(row => {
        rowClients.innerHTML +=`
        <tr >
        <th>${row.id}</th>
        <th>${row.company}</th>
        <td>${row.cnpj}</td>
        <td>${row.email}</td>
        <td>${row.telephone}</td>
        <td class="action">
        <form method="POST" action="/client-view" class="form-view-client">
        <input type="hidden" class="id-delete-client" name="id" value="${row.id}">
        <button type="submit" class="btn btn-secondary btn-lg btn-view-client" data-toggle="modal"
            data-target="#delete-client">
            <span class="glyphicon glyphicon-eye-open" style="color: #fff;"></span>
        </button>
    </form>
        <form action="/clients/${row.id}?_method=PUT" method="POST">
        <button type="submit" class="btn btn-primary btn-lg">
            <span class="glyphicon glyphicon-pencil" style="color: #fff;"></span>
        </button>
    </form>
    <form method="POST" action="/clients?_method=DELETE"  class="form-delete-client">
        <input type="hidden" class="id-delete-client" name="id" value="${row.id}">
        <button type="submit" class="btn btn-danger btn-lg btn-delete-client" data-toggle="modal" data-target="#delete-client">
        <span class="glyphicon glyphicon-trash"  style="color: #fff;"></span>
        </button>
    </form>
        </td>
    </tr>
        `
    });
  
    
})
$(".alert").alert('close')

// ############ Botão Delete Client ##############
const btnDeleteClient = document.getElementsByClassName('btn-delete-client')
const formDeleteClient = document.getElementsByClassName('form-delete-client')
const idDeleteClient = document.getElementsByClassName('id-delete-client')
   for (let index = 0; index < btnDeleteClient.length; index++) {
    btnDeleteClient[index].addEventListener('click', async e=>{
        e.preventDefault()
        const del = confirm("Tem certeza de Deletar o cliente?")
        if(del) formDeleteClient[index].submit()
    })
}
   


console.log(trClient)