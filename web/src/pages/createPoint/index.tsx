import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import logo from '../../assets/logo.svg';
import { useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi'
import { Map, TileLayer, Marker } from 'react-leaflet';
import Api from '../../services/api';
import axios from 'axios';
import { LeafletMouseEvent } from 'leaflet';
import './styles.css';
import Dropzone from '../../components/Dropzone';
import Button from '../../components/Button/Button';
import Field from '../../components/Field/Field';
import Fieldset from '../../components/Fieldset/Fieldset';
import Itemslist from '../../components/Itemslist/Itemslist';
import OverlayMessage from '../../components/OverlayMessage/OverlayMessage';
import { FiCheckCircle } from 'react-icons/fi';
import { FiFrown } from 'react-icons/fi';


interface Item {
    id: number,
    title: string,
    image_url: string
}

interface IBGEUFResponse {
    sigla: string
}

interface IBGECityResponse {
    nome: string
}

const CreatePoint = () => {
    const [items, setItems] = useState<Item[]>([]);
    const [ufs, setUfs] = useState<string[]>([]);
    const [cities, setCities] = useState<string[]>([]);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        whatsapp: '',
    });
    const [selectedUf, setSelectedUf] = useState('0');
    const [selectedCity, setSelectedCity] = useState('0');
    const [selectedPosition, setSelectedPosition] = useState<[number, number]>([0, 0]);
    const [selectedItems, setSelectedItems] = useState<number[]>([]);
    const [initialPosition, setInitialPosition] = useState<[number, number]>([0, 0]);
    const [selectedFile, setSelectedFile] = useState<File>();
    const [message, setMessage] = useState<any>(false);
    const history = useHistory();

    useEffect(() => {
        Api.get('items').then(response => {
            setItems(response.data);
        })
    }, [])

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            setInitialPosition([latitude, longitude]);
        })
    }, [])

    useEffect(() => {
        axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
            .then(response => {
                const ufInitials = response.data.map(uf => uf.sigla);
                setUfs(ufInitials);
            })
    }, [])

    useEffect(() => {
        if (selectedUf === "0") {
            return
        }
        axios.get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`)
            .then(response => {
                const cityNames = response.data.map(city => city.nome);
                setCities(cityNames);
            })
    }, [selectedUf])

    function HandleSelectUf(event: ChangeEvent<HTMLSelectElement>) {
        const uf = event.target.value;

        setSelectedUf(uf);
    }

    function HandleSelectCity(event: ChangeEvent<HTMLSelectElement>) {
        const city = event.target.value;

        setSelectedCity(city);
    }

    function HandleMapClick(event: LeafletMouseEvent) {
        setSelectedPosition([
            event.latlng.lat,
            event.latlng.lng
        ])
    }

    function HandleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    }

    function HandleSelectItem(id: number) {
        const alreadySelected = selectedItems.includes(id);
        if (alreadySelected === true) {
            const filteredItems = selectedItems.filter(item => item !== id);
            setSelectedItems(filteredItems);
        } else {
            setSelectedItems([...selectedItems, id])
        }
    }

    function HandleSubmit(event: FormEvent) {
        event.preventDefault();
        const { name, email, whatsapp } = formData;
        const uf = selectedUf;
        const city = selectedCity;
        const [latitude, longitude] = selectedPosition;
        const items = selectedItems;

        const data = new FormData();
        data.append('name', name);
        data.append('email', email);
        data.append('whatsapp', whatsapp);
        data.append('uf', uf);
        data.append('city', city);
        data.append('latitude', String(latitude));
        data.append('longitude', String(longitude));
        data.append('items', items.join(','));
        if (selectedFile) {
            data.append('image', selectedFile);
        }

        Api.post('points', data)
            .then(async response => {
                setMessage(<OverlayMessage type="success" icon={<FiCheckCircle />} message="Cadastrao concluído!" />);
                setTimeout(function () {
                    history.push('/');
                }, 3000);
            })
            .catch(error => {
                setMessage(<OverlayMessage type="error" icon={<FiFrown />} message="Ops! Algum erro ocorreu, tente novamente." />)
                setTimeout(function () {
                    setMessage(false)
                }, 3000);
            })
    }

    return (
        <>
            {message !== false &&
                message
            }
            <div id="page-create-point">
                <header>
                    <img src={logo} alt="Ecoleta" />
                    <Button
                        className={"button back"}
                        type={"link"}
                        page={"/"}
                        icon={<FiArrowLeft />}
                        text={'Voltar para a home'}
                    />
                </header>

                <form onSubmit={HandleSubmit}>
                    <h1>Cadastro do ponto de coleta</h1>
                    <Dropzone onFileUploaded={setSelectedFile} />
                    <Fieldset legend={"Dados"}>
                        <Field className={"field"}
                            label={'Nome da entidade'}
                            type={"text"}
                            name={"name"}
                            id={"name"}
                            onChange={HandleInputChange}
                        />
                    </Fieldset>
                    <Fieldset>
                        <Field className={"field"}
                            label={'E-mail'}
                            type={"email"}
                            name={"email"}
                            id={"email"}
                            onChange={HandleInputChange}
                        />
                        <Field className={"field"}
                            label={'Whatsapp'}
                            type={"text"}
                            name={"whatsapp"}
                            id={"whatsapp"}
                            onChange={HandleInputChange}
                        />
                    </Fieldset>

                    <Fieldset legend={"Endereço"} sublegend={"Selecione o endereço no mapa"}>

                        <Map center={initialPosition} zoom={15} onclick={HandleMapClick}>
                            <TileLayer
                                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <Marker position={selectedPosition} />
                        </Map>
                        <Field
                            className="field"
                            label={"Estado (UF)"}
                            name={"uf"}
                            id={"uf"}
                            value={selectedUf}
                            onChange={HandleSelectUf}>
                            <option value="0">Selecione uma UF</option>
                            {ufs.map(uf => (
                                <option key={uf} value={uf}>{uf}</option>
                            ))}
                        </Field>
                        <Field
                            className="field"
                            label={"Cidade"}
                            value={selectedCity}
                            name={"city"}
                            id={"city"}
                            onChange={HandleSelectCity}>
                            <option value="0">Selecione uma cidade</option>
                            {cities.map(city => (
                                <option key={city} value={city}>{city}</option>
                            ))}
                        </Field>

                    </Fieldset>

                    <Fieldset legend={"Itens de coleta"} sublegend={"Selecione um ou mais itens abaixo"}>
                        <Itemslist>
                            {items.map(item => (
                                <li key={item.id} onClick={() => HandleSelectItem(item.id)}
                                    className={selectedItems.includes(item.id) ? 'selected' : ''}>
                                    <img src={item.image_url} alt={item.title} />
                                    <span>{item.title}</span>
                                </li>
                            )
                            )}
                        </Itemslist>
                    </Fieldset>
                    <Button className={'button default'} type="submit" text='Cadastrar ponto de coleta' />
                </form>
            </div >
        </>
    )
}

export default CreatePoint;