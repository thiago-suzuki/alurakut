import React from 'react'
import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons'
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations'

function ProfileSideBar({githubUser}) {
  return (
    <Box as="aside">
      <img src={`https://github.com/${githubUser}.png`} style={{ borderRadius: '8px' }} />
      <hr />

      <a className="boxLink" href={`https://github.com/${githubUser}`} target="_blank">
        { githubUser }
      </a>

      <hr />

      <AlurakutProfileSidebarMenuDefault />

    </Box>
  )
}



export default function Home() {
    const githubUser = 'thiago-suzuki';
    const [comunidades, setComunidades] = React.useState([{
      id: '165165146516516',
      url: 'https://www.alura.com.br/',
      title: 'Alura',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvHnrABvcShcCoG_01ZN3q8oGA4CiEhdr1vw&usqp=CAU'
    }]);
    /* const comunidades = ['Alurakut']; */
    const pessoasFavoritas = [
      'john-smilga',
      'omariosouto',
      'peas',
      'rafaballerini',
      'marcobrunodev',
      'thecodercoder'
    ]
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
              <h1 className="title">Bem Vindo(a)</h1>
              <OrkutNostalgicIconSet />
            </Box>

            <Box>
              <h2 className="subTitle">O que você deseja fazer?</h2>  
              <form onSubmit={function handleCriaComunidade(e) {
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
              }}>
                <div>
                  <input 
                    placeholder="Qual vai ser o nome da sua comunidade?" 
                    name="title" 
                    aria-label="Qual vai ser o nome da sua comunidade?" 
                    type="text"
                   />
                </div>
                <div>
                  <input 
                    placeholder="Coloque uma URL para usarmos de Capa" 
                    name="image" 
                    aria-label="Coloque uma URL para usarmos de Capa" 
                    type="text"
                   />
                </div>
                <div>
                  <input
                    placeholder="Coloque a URL do site"
                    name="url"
                    aria-label="Coloque a URL do site"
                    type="text"
                />
              </div>

                <button>
                  Criar Comunidade
                </button>
              </form>
            </Box>          
          </div>
          
          <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
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

            <ProfileRelationsBoxWrapper>
              <h2 className="smallTitle">
                Pessoas ({pessoasFavoritas.length})
              </h2>
              
               <ul>
                {pessoasFavoritas.map((itemAtual) => {
                  return (
                    <li key={itemAtual}>
                      <a href={`https://github.com/${itemAtual}`} target="_blank">
                        <img src={`https://github.com/${itemAtual}.png`} />
                        <span>{itemAtual}</span>
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