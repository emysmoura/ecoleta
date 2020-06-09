import React from 'react';
import { FiLogIn } from 'react-icons/fi'
import logo from '../../assets/logo.svg';
import './styles.css';
import Button from '../../components/Button/Button';
const Home = () => {
    return (
        <div id="page-home">
            <div className="content">
                <header>
                    <img src={logo} alt="Ecoleta" />
                </header>
                <main>
                    <h1>Seu marketplace de coleta de resíduos.</h1>
                    <p>Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.</p>
                    <Button
                        className={"button default"}
                        page={"/create-point"}
                        icon={<FiLogIn />}
                        text={'Cadastre um ponto de coleta'}
                    />
                </main>
            </div>
        </div>
    )
}

export default Home;