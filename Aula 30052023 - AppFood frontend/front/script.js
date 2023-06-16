async function getDadosApi(url) {
    const response = await fetch(url);
    return response.json();
  }
  
  const tabs = document.querySelectorAll(".tabs_wrap ul li");
  const categoriaTab = document.querySelector('[data-tabs="categoria"]');
  const produtoTab = document.querySelector('[data-tabs="produto"]');
  const categoriaForm = document.querySelector(".categoria");
  const produtoForm = document.querySelector(".produto");
  const listaCategorias = document.querySelector("#categoriaProduto");
  
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((tab) => {
        tab.classList.remove("active");
      });
      tab.classList.add("active");
      const tabval = tab.getAttribute("data-tabs");
  
      if (tabval === "categoria") {
        categoriaTab.classList.add("active");
        produtoTab.classList.remove("active");
        categoriaForm.classList.add("active");
        produtoForm.classList.remove("active");
      } else if (tabval === "produto") {
        categoriaTab.classList.remove("active");
        produtoTab.classList.add("active");
        categoriaForm.classList.remove("active");
        produtoForm.classList.add("active");
  
        getDadosApi("http://localhost:3000/categories")
          .then((categorias) => {
            
            listaCategorias.innerHTML = "";
            
            categorias.forEach((categoria) => {
              let option = document.createElement("option");
              option.setAttribute("value", categoria["name"]);
  
              let optionText = document.createTextNode(categoria["name"]);
              option.appendChild(optionText);
  
              listaCategorias.appendChild(option);
            });
  
            const selectedCategoria = categorias.find(
              (categoria) => categoria["name"] === listaCategorias.value
            );
            if (selectedCategoria) {
              document.getElementById("categoriaProdutoIcone").value =
                selectedCategoria["icon"];
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  });
  
  document.getElementById("categoriaProduto").addEventListener("change", () => {
    const selectCategoriaProduto = document.getElementById("categoriaProduto");
    const inputCategoriaProdutoIcone = document.getElementById(
      "categoriaProdutoIcone"
    );
  
    const nomeCategoriaProduto = selectCategoriaProduto.value;
  
    getDadosApi("http://localhost:3000/categories")
      .then((categorias) => {
        const selectedCategoria = categorias.find(
          (categoria) => categoria["name"] === nomeCategoriaProduto
        );
        if (selectedCategoria) {
          inputCategoriaProdutoIcone.value = selectedCategoria["icon"];
        }
      })
      .catch((error) => {
        console.log(error);
      });
  });
  
  document.getElementById("enviarCategoria").addEventListener("click", () => {
    const inputNomeCategoria = document.getElementById("nomeCategoria");
    const inputIconeCategoria = document.getElementById("iconeCategoria");
  
    const dados = {
      name: inputNomeCategoria.value,
      icon: inputIconeCategoria.value,
    };
  
    fetch("http://localhost:3000/categories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dados),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        alert("Categoria cadastrada com sucesso!");
      })
      .catch((error) => {
        console.log(error);
      });
  
    inputNomeCategoria.value = "";
    inputIconeCategoria.value = "";
  });
  
  document.getElementById("enviarProduto").addEventListener("click", () => {
    const inputNomeProduto = document.getElementById("nomeProduto");
    const inputDescProduto = document.getElementById("descricaoProduto");
    const inputImagemProduto = document.getElementById("imagemProduto");
    const inputPrecoProduto = document.getElementById("precoProduto");
    const selectCategoriaProduto = document.getElementById("categoriaProduto");
    const inputCategoriaProdutoIcone = document.getElementById("categoriaProdutoIcone");
  
    const nomeCategoriaProduto = selectCategoriaProduto.value;
  
    getDadosApi("http://localhost:3000/categories")
      .then((categorias) => {
        const selectedCategoria = categorias.find(
          (categoria) => categoria["name"] === nomeCategoriaProduto
        );
        if (selectedCategoria) {
          const idCategoriaProduto = selectedCategoria["_id"];
          const nomeProduto = inputNomeProduto.value;
          const descricaoProduto = inputDescProduto.value;
          const imagemProduto = inputImagemProduto.files[0];
          const precoProduto = Number(inputPrecoProduto.value);
  
          const formData = new FormData();
  
          formData.append("name", nomeProduto);
          formData.append("description", descricaoProduto);
          formData.append("imagePath", imagemProduto);
          formData.append("price", precoProduto);
          formData.append("category", idCategoriaProduto);
  
          fetch("http://localhost:3000/products", {
            method: "POST",
            body: formData,
          })
            .then((response) => response.json())
            .then((data) => {
              console.log(data);
              alert("Produto cadastrado com sucesso!");
            })
            .catch((error) => {
              console.log(error);
            });
  
          inputNomeProduto.value = "";
          inputDescProduto.value = "";
          inputImagemProduto.value = "";
          inputPrecoProduto.value = "";
        }
      })
      .catch((error) => {
        console.log(error);
      });
  });  