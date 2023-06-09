import React from 'react';

const Link = (props) => {
  const { link } = props;
  return (
    <div>
      <div>
        {link.titulo} ({link.autor}) ({link.genero}) ({link.editorial})({link.anio})({link.numPages}) ({link.costo}) ({link.categoria}) ({link.edicion}) ({link.idioma})
      </div>
    </div>
  );
};

export default Link;