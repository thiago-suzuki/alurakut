import React from 'react'
import nookies from 'nookies'
import jwt from 'jsonwebtoken';
import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons'
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

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



export default function Home(props) {
    const githubUser = props.githubUser;
    /*const [comunidades, setComunidades] = React.useState([
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

    ]);*/

    //API GraphQL
    const [comunidades, setComunidades] = useState([])
    useEffect(() => {
      fetch('https://graphql.datocms.com/', {
        method: 'POST',
        headers: {
          'Authorization': '027586767a0bf3128ad03bca6dd148',
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          "query": `query {
            allComunidades {
              id
              title
              image
              url
            }
        }` })
      })
        .then((resposta) => resposta.json())
        .then((respComp) => {
          const comunidadesDato = respComp.data.allComunidades
          console.log(comunidadesDato)
          setComunidades(comunidadesDato)
        })
        .catch((err) => {
          console.log(err)
        })
    }, [])

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
        <motion.div initial={{opacity: 0, y: -300}} animate={{opacity: 1, y: 0}} transition={{duration: 3}}>
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
                  url: dadosDoForm.get('url') ,
                  title: dadosDoForm.get('title'), 
                  image: dadosDoForm.get('image') 
                }
                fetch('/api/comunidades', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(comunidade),
                })
                  .then(async (respomse) => {
                    const dados = await response.json();
                    console.log(dados.registroCriado);
                    const comunidade = dados.registroCriado;
                    const comunidadesAtualizadas = [...comunidades, comunidade]
                    setComunidades(comunidadesAtualizadas)
                  })
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
        </motion.div>
      </>
    )
}

export async function getServerSideProps(context) {
  const cookies = nookies.get(context)
  if (!cookies.USER_TOKEN) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      }
    }
  }

  const token = cookies.USER_TOKEN;
  const { isAuthenticated } = await fetch('https://alurakut.vercel.app/api/auth', {
    headers: {
      Authorization: token
    }
  }).then((resposta) => resposta.json())

  if (!isAuthenticated) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      }
    }
  }
  const { githubUser } = jwt.decode(token);
  return {
    props: {
      githubUser
    },
  }
}