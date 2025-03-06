//preenhcer informações do usuário
function userInfos(data) {
    document.querySelector('.user-profile img').src = data.profileImage;
    document.querySelector('.user-profile h1').innerHTML = `${data.name} <b>${data.lastName}</b>`;
    document.querySelector('.user-profile p').innerText = data.description;
}

//preencher links
function userLinks(links) {
    const linksSection = document.querySelector('.user-links');
    const linkPattern = linksSection.getElementsByClassName("pattern")[0];

    links.forEach(link => {
        const linkTag = linkPattern.cloneNode(true);

        linkTag.href = link.url;
        linkTag.setAttribute("aria-label", `Acessar link: ${link.name}`);
        linkTag.getElementsByTagName("p")[0].innerHTML = link.name;

        linkTag.classList.remove("pattern");

        linksSection.appendChild(linkTag);
    });
}

//redes sociais
function userRedesLinks(socialLinks) {
    const linksSection = document.querySelector('.user-redes-links');
    const linkPattern = linksSection.getElementsByClassName("pattern")[0];

    socialLinks.forEach(link => {
        const linkTag = linkPattern.cloneNode(true);

        linkTag.href = link.url;
        linkTag.setAttribute("aria-label", `Acessar link: ${link.platform}`);
        linkTag.getElementsByTagName("img")[0].src = link.icon;

        linkTag.classList.remove("pattern");

        linksSection.appendChild(linkTag);
    });
}

fetch('./data.json').then(response => response.json()).then(dados => {
    if (dados) {
        const { cores, links, socialLinks } = dados;

        userInfos(dados);
        userLinks(links || []);
        userRedesLinks(socialLinks || []);

        //variáveis de estilo :root
        document.documentElement.style.setProperty('--primaria', cores.primaria);
        document.documentElement.style.setProperty('--background', cores.background);
        document.documentElement.style.setProperty('--secundaria', cores.secundaria);
    } else {
        console.error('Dados não encontrados');
    }
}).catch((error) => {
    console.error('Erro ao carregar os dados:', error)
});
