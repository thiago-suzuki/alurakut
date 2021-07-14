import React from 'react'
import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons'
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations'
import { useState, useEffect } from 'react'

function ProfileSideBar({githubUser}) {
  return (
    <Box as="aside">
      <img src={`https://github.com/${githubUser}.png`} style={{ borderRadius: '8px' }} />
      <hr />

      <a className="boxLink" href={`https://github.com/${githubUser}`} target="_blank">
        @{githubUser}
      </a>

      <hr />

      <AlurakutProfileSidebarMenuDefault />

    </Box>
  )
}

function ProfileRelationsBox(propriedades) {
  return (
     <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">
        {propriedades.title} ({propriedades.items.length})
      </h2>

      <ul>
         {propriedades.items.slice(0,6).map((itemAtual) => {
          return (
            <li key={itemAtual.id}>
              <a href={itemAtual.html_url} target="_blank" rel="noopener noreferrer">
                <img src={itemAtual.avatar_url} />
                <span>{itemAtual.login}</span>
              </a>
            </li>
          ); 
        })}
      </ul>
    </ProfileRelationsBoxWrapper>
  )
}



export default function Home() {
    const githubUser = 'thiago-suzuki';
    const [comunidades, setComunidades] = React.useState([
      {
        id: '165651',
        url: 'https://www.alura.com.br/',
        title: 'Alura',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvHnrABvcShcCoG_01ZN3q8oGA4CiEhdr1vw&usqp=CAU'
      },
      
      {
        id: '876543',
        url: 'https://www.hostinger.com.br/tutoriais/o-que-e-javascript',
        title: 'JavaScript',
        image: 'https://cdn.iconscout.com/icon/free/png-256/javascript-2752148-2284965.png'
      }

    ]);
    const [userInfo, setUserInfo] = useState({});
    useEffect(() => {
      fetch(`https://api.github.com/users/${githubUser}`) 
        .then(async (response) => {
          if(response.ok) {
            const resposta = await response.json()
            return resposta
          }
          throw new Error("Não foi possível pegar os dados.")
        })
        .then((response) => {
          setUserInfo(response);
        })
        .catch((err) => {
          console.log(err)
        })
    }, []);

    const [seguidores, setSeguidores] = useState([])
    useEffect(() => {
      fetch(`https://api.github.com/users/${githubUser}/followers`) 
        .then(async (response) => {
          if(response.ok) {
            const resposta = await response.json()
            return resposta
          }
          throw new Error("Não foi possível pegar os dados.")
        })
        .then((response) => {
          setSeguidores(response);
        })
        .catch((err) => {
          console.log(err)
        })
    }, []);

    const [seguindo, setSeguindo] = useState([])
    useEffect(() => {
      fetch(`https://api.github.com/users/${githubUser}/following`) 
        .then(async (response) => {
          if(response.ok) {
            const resposta = await response.json()
            return resposta
          }
          throw new Error("Não foi possível pegar os dados.")
        })
        .then((response) => {
          setSeguindo(response);
        })
        .catch((err) => {
          console.log(err)
        })
    }, []);

    /* const comunidades = ['Alurakut']; */
    
    function Random(min, max) {
      min = Math.ceil(min);
      max = Math.ceil(max);
      return Math.floor(Math.random() * (max - min)) + min;
    }

    return ( 
      <>
        <AlurakutMenu githubUser={githubUser}/>
        <MainGrid>
          {/* <Box style="grid-area: profileArea;"> */}
          <div className="profileArea" style={{ gridArea: 'profileArea' }}>
            <ProfileSideBar githubUser={githubUser}/>
          </div>
          
          <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
            <Box>
              <h1 className="title">
                Bem Vindo(a), {userInfo.name}
              </h1>
              <OrkutNostalgicIconSet
                recados={Random(1,100)}
                fotos={Random(1,100)}
                videos={Random(1,100)}
                fas={Random(1,20)}
                mensagens={Random(1,100)}
                confiavel={Random(1,3)}
                legal={Random(1,3)}
                sexy={Random(1,3)}
              />
            </Box>

            <Box>
              <h2 className="subTitle">O que você deseja fazer?</h2>  
              <form id="formComunidade" onSubmit={function handleCriaComunidade(e) {
                e.preventDefault();
                const dadosDoForm = new FormData(e.target);
                console.log('Campo: ', dadosDoForm.get('title'));
                console.log('Campo: ', dadosDoForm.get('image'));
                const comunidade = {
                  id: new Date().toISOString(),
                  url: dadosDoForm.get('url') ,
                  title: dadosDoForm.get('title'), 
                  image: dadosDoForm.get('image') 
                }
                const comunidadesAtualizadas = [...comunidades, comunidade];
                setComunidades(comunidadesAtualizadas)
                document.getElementById('formComunidade').reset();
              }}>
                <div>
                  <input 
                    placeholder="Qual vai ser o nome da sua comunidade?" 
                    name="title" 
                    aria-label="Qual vai ser o nome da sua comunidade?" 
                    type="text"
                    required
                   />
                </div>
                <div>
                  <input 
                    placeholder="Coloque uma URL para usarmos de Capa" 
                    name="image" 
                    aria-label="Coloque uma URL para usarmos de Capa" 
                    type="text"
                    required
                   />
                </div>
                <div>
                  <input
                    placeholder="Coloque a URL do site"
                    name="url"
                    aria-label="Coloque a URL do site"
                    type="text"
                    required
                />
              </div>

                <button>
                  Criar Comunidade
                </button>
              </form>
            </Box>          
          </div>
          
          <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>

            <ProfileRelationsBox title="Seguidores" items={seguidores} />
            
            <ProfileRelationsBox title="Seguindo" items={seguindo} />

            <ProfileRelationsBoxWrapper>
              <h2 className="smallTitle">
                Comunidades ({comunidades.length})
              </h2>
              <ul>
                {comunidades.map((itemAtual) => {
                  return (
                    <li key={itemAtual.id}>
                      <a href={itemAtual.url} target="_blank">
                        <img src={itemAtual.image} />
                        <span>{itemAtual.title}</span>
                      </a>
                    </li>
                  )
                })}
              </ul>
            </ProfileRelationsBoxWrapper>

          </div>
        </MainGrid>
      </>
    )
}