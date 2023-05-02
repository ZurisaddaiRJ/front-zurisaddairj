import React from 'react';
import Link from './Link';
import { useQuery, gql } from '@apollo/client';

const FEED_QUERY = gql`
query{
  libros{
   id
   titulo
   autor
   genero
   editorial
   anio
   numPages
   costo
   categoria
   edicion
   idioma
  }
}
`
  ;

const LinkList = () => {
  const { data } = useQuery(FEED_QUERY);
  /* const linksToRender = [
     {
       id: 'link-id-1',
       description:
         'Prisma gives you a powerful database toolkit 😎',
       url: 'https://prisma.io'
     },
     {
       id: 'link-id-2',
       description: 'The best GraphQL client',
       url: 'https://www.apollographql.com/docs/react/'
     },
     {
         id: 'link-id-3',
         description: 'Agregar GraphQL client2',
         url: 'https://www.apollographql.com/docs/react/'
       }
   ];*/

  return (
    <div>
      {data && (
        <>
          {data.libros.map((link) => (
            <table>
              <Link key={link.id} link={link} />
            </table>
          ))}
        </>
      )}
    </div>
  );
};

export default LinkList;