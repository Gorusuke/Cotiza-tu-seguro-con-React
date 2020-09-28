import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';


const ContenedorResumen = styled.div`
    padding: 1rem;
    text-align: center;
    background-color: #00838F;
    color: white;
    margin-top: 2rem;
`;

const Li = styled.li`
    margin: 1rem;
    text-align: center;
    text-transform: capitalize;
    font-size: 20px;
`;


const Resumen = ({datos}) => {

    const {marca, year, plan} = datos;
    if(marca === '' || year === '' || plan === '') return null;

    return ( 
        <ContenedorResumen>
            <h2>Resumen de Cotizacion:</h2>
            <ul>
                <Li>Marca: {marca}</Li>
                <Li>Año Del Auto: {year}</Li>
                <Li>Plan: {plan}</Li>
            </ul>
        </ContenedorResumen>
    );
}

Resumen.propTypes = {
    datos: PropTypes.object.isRequired
}
 
export default Resumen;