import React, {useState} from 'react';
import styled from '@emotion/styled';
import {ObtenerDiferenciaYear, calcularMarca, obtenerPlan} from '../helper';
import PropTypes from 'prop-types';

const Campo = styled.div`
    display: flex;
    margin-bottom: 1rem;
    align-items: center;
`;

const Label = styled.label`
    flex: 0 0 100px;
`;

const Select = styled.select`
    display: block;
    width: 100%;
    padding: 1rem;
    border: 1px solid #e1e1e1;
    -webkit-appearance: none;
`;

const InputRadio = styled.input`
    margin: 0 1rem;
`;

const Button = styled.button`
    background-color: #00838f;
    font-size: 16px;
    width: 100%;
    padding: 1rem;
    color: white;
    text-transform: uppercase;
    font-weight: bold;
    border: 1px solid #00838f;
    border-radius: 5px;
    transition: all .3s ease;
    margin-top: 1.5rem;

    &:hover{
        background-color: white;
        color: #00838f;
        cursor: pointer;
        border: 1px solid #00838f;
    }
    &:focus{
        outline: 0px;
    }
`;

const Error = styled.div`
    background-color: red;
    color: white;
    padding: 1rem;
    width: 100%100vh;
    text-align: center;
    margin-bottom: 1.5rem;
`;


const Formulario = ({setResumen, setCargando}) => {

    const [datos, setDatos] = useState({
        marca: '',
        year: '',
        plan: ''
    });
    const [error, setError] = useState(false)

    // Extraer los valores del state
    const {marca, year, plan} = datos;

    // Leer los datos de formulario y colocarlos en el state
    const obtenerInformacion = e => {
        setDatos({
            ...datos,
            [e.target.name] : e.target.value
        })
    }

    // Cuando el usuario cotiza
    const cotizarSeguro = e => {
        e.preventDefault();

        if(marca === '' || year === '' || plan === ''){
            setError(true);
            return;
        }
        setError(false);

        // Una base de 2000
        let base = 2000;

        // Obtener la diferencia de años
        const diferencia = ObtenerDiferenciaYear(year);

        // Por cada año hay que restar el 3%
        base -= ((diferencia * 3 ) * base) / 100;

        // Americano 15%, Asiatico 5%, Europeo 30%
        base = calcularMarca(marca) * base;

        // Basico 20%, Completo 50%
        const incrementoPlan = obtenerPlan(plan);

        // Total
        base = Math.floor(base * incrementoPlan);
        
        // Agrega el Spinner
        setCargando(true);

        setTimeout(() => {
            // Elimina el Spinner
            setCargando(false);
            // Cargan los resultados
            setResumen({
                cotizacion: base,
                datos
            });
        }, 3000);

        /* // Reiniciar el formulario
        setDatos({
            marca: '',
            year: '',
            plan: ''
        }); */
    }

    return ( 
        <form
            onSubmit={cotizarSeguro}
        >
            {error ? <Error>Todos Los Campos Son Obligatorios</Error>: null}
            <Campo>
                <Label>Marca</Label>
                <Select
                    name="marca"
                    value={marca}
                    onChange={obtenerInformacion}
                >
                    <option value="">--Seleccione--</option>
                    <option value="americano">Americano</option>
                    <option value="europeo">Europeo</option>
                    <option value="asiatico">Asiatico</option>
                </Select>             
            </Campo>

            <Campo>
                <Label>Año</Label>
                <Select
                    name="year"
                    value={year}
                    onChange={obtenerInformacion}
                >
                    <option value="">-- Seleccione --</option>
                    <option value="2021">2021</option>
                    <option value="2020">2020</option>
                    <option value="2019">2019</option>
                    <option value="2018">2018</option>
                    <option value="2017">2017</option>
                    <option value="2016">2016</option>
                    <option value="2015">2015</option>
                    <option value="2014">2014</option>
                    <option value="2013">2013</option>
                    <option value="2012">2012</option>  
                </Select>          
            </Campo>

            <Campo>
                <Label>Plan</Label>
                <InputRadio type="radio" value="basico" name="plan" checked={plan === "basico"} onChange={obtenerInformacion}/> Basico
                <InputRadio type="radio" value="completo" name="plan" checked={plan === "completo"} onChange={obtenerInformacion}/> Completo
            </Campo>

            <Button type="submit">Cotizar</Button>
        </form>
    );
}

Formulario.propTypes = {
    setResumen: PropTypes.func.isRequired,
    setCargando: PropTypes.func.isRequired
}

export default Formulario;