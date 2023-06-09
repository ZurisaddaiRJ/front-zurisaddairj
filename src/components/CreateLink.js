import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

const CREATE_LINK_MUTATION = gql`
  mutation createLibros(
    $titulo: String!
    $autor: String!
    $genero: String!
    $editorial: String!
    $anio: Int!
    $numPages: Int!
    $costo: Int!
    $categoria: String!
    $edicion: Int!
    $idioma: String!
  ) {
    createLibros( titulo: $titulo, autor: $autor, genero: $genero, editorial: $editorial, anio: $anio, numPages: $numPages, costo: $costo, categoria: $categoria, edicion: $edicion, idioma: $idioma ) {
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
`;

const CreateLink = () => {

  const [formState, setFormState] = useState({
    titulo: '',
    autor: '',
    genero: '',
    editorial: '',
    anio: 0,
    numPages: 0,
    costo: 0,
    categoria: '',
    edicion: 0,
    idioma: ''
  });

  const navigate = useNavigate();

  const [createLink] = useMutation(CREATE_LINK_MUTATION, {
    variables: {
      titulo: formState.titulo,
      autor: formState.autor,
      genero: formState.genero,
      editorial: formState.editorial,
      anio: formState.anio,
      numPages: formState.numPages,
      costo: formState.costo,
      categoria: formState.categoria,
      edicion: formState.edicion,
      idioma: formState.idioma
    },
    onCompleted: () => navigate('/')
  });

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createLink();
        }}
      >
        <div className="flex flex-column mt3">
          <input
            className="mb2"
            value={formState.titulo}
            onChange={(e) =>
              setFormState({
                ...formState,
                titulo: e.target.value
              })
            }
            type="text"
            placeholder="A titulo for the book"
          />
          <input
            className="mb2"
            value={formState.autor}
            onChange={(e) =>
              setFormState({
                ...formState,
                autor: e.target.value
              })
            }
            type="text"
            placeholder="The autor for the book"
          />
          <input
            className="mb2"
            value={formState.genero}
            onChange={(e) =>
              setFormState({
                ...formState,
                genero: e.target.value
              })
            }
            type="text"
            placeholder="The genero for the book"
          />
          <input
            className="mb2"
            value={formState.editorial}
            onChange={(e) =>
              setFormState({
                ...formState,
                editorial: e.target.value
              })
            }
            type="text"
            placeholder="The editorial for the book"
          />
          <input
            className="mb2"
            value={formState.anio}
            onChange={(e) =>
              setFormState({
                ...formState,
                anio: e.target.value
              })
            }
            type="number"
            placeholder="The año for the book"
          />
          <input
            className="mb2"
            value={formState.numPages}
            onChange={(e) =>
              setFormState({
                ...formState,
                numPages: e.target.value
              })
            }
            type="number"
            placeholder="The numPages for the book"
          />
          <input
            className="mb2"
            value={formState.costo}
            onChange={(e) =>
              setFormState({
                ...formState,
                costo: e.target.value
              })
            }
            type="number"
            placeholder="The costo for the book"
          />
          <input
            className="mb2"
            value={formState.categoria}
            onChange={(e) =>
              setFormState({
                ...formState,
                categoria: e.target.value
              })
            }
            type="text"
            placeholder="The categoria for the book"
          />
          <input
            className="mb2"
            value={formState.edicion}
            onChange={(e) =>
              setFormState({
                ...formState,
                edicion: e.target.value
              })
            }
            type="number"
            placeholder="The edicion for the book"
          />
          <input
            className="mb2"
            value={formState.idioma}
            onChange={(e) =>
              setFormState({
                ...formState,
                idioma: e.target.value
              })
            }
            type="text"
            placeholder="The idioma for the book"
          />
        </div>
        <button class="btn-success">Submit</button>
      </form>
    </div>
  );
};

export default CreateLink;