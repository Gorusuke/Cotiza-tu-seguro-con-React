import React from 'react';
import styled from '@emotion/styled';
import {TransitionGroup, CSSTransition } from 'react-transition-group'
import PropTypes from 'prop-types';


const Mensaje = styled.p`
    background-color: rgb(127, 224, 237);
    margin-top: 2rem;
    padding: 1rem;
    text-align: center;
    font-size: 1.15rem;
`;

const Div = styled.div`
    padding: .5rem;
    text-align: center;
    border: 1px solid #26C6DA;
    background-color: rgb(127, 224, 237);
    margin-top: 1rem;
    position: relative;
`;

const TextoCotizacion = styled.p`
    margin: 0;
    padding: 1rem;
    color: #00838F;
    text-transform: uppercase;
    font-weight: bold;
`;

const Resultado = ({cotizacion}) => {

    return ( 
        (cotizacion === 0)
        ? <Mensaje>Elige marca, año y tipo de seguro</Mensaje> 
        :(
            <Div>
                <TransitionGroup component="span" className="resultado">
                    <CSSTransition classNames="resultado" key={cotizacion} timeout={{enter: 500, exit: 500}}>
                        <TextoCotizacion>El total es: <span>${cotizacion} </span> </TextoCotizacion>
                    </CSSTransition>
                </TransitionGroup>
            </Div>
        )
    )
}

Resultado.propTypes = {
    cotizacion: PropTypes.number.isRequired
}

export default Resultado;