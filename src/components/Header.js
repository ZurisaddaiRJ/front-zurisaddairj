import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AUTH_TOKEN } from '../constants';
import { useTranslation } from "react-i18next";
import LanguageSelect from './LanguageSelect';



const Header = () => {

  const { t } = useTranslation();
  const navigate = useNavigate();
  const authToken = localStorage.getItem(AUTH_TOKEN);
  
  return (
    <div class="nowrap orange">

      <div className="flex flex-fixed black">
        <Link to="/" className="no-underline black">
          <div className="fw7 mr1">Hacker</div>
        </Link>
        <Link to="/" className="ml1 no-underline black">
          {t('List')}
        </Link>
        <div className="ml1">|</div>
        <Link
          to="/create"
          className="ml1 no-underline black"
        >
          {t('submit')}
        </Link>

        <div className="ml1">|</div>
        <Link
          to="/search"
          className="ml1 no-underline black"
        >
          {t('search')}
          
        </Link>

        <div className="ml1">|</div>
        <Link
          to="/text-davinci-003"
          className="ml1 no-underline black"
        >
          {t('text-davinci-003')}
          
        </Link>

        <div className="ml1">|</div>
        <Link
          to="/img-davinci-003"
          className="ml1 no-underline black"
        >
          {t('Create-Image')}
        </Link>

        <div className="ml1">|</div>
        <Link
          to="/unirservice"
          className="ml1 no-underline black"
        >
          {t('Servicios OpenAi')}
        </Link>

        <div className="ml1">|</div>
        <Link
          to="/chat"
          className="ml1 no-underline black"
        >
          {t('Servicio Chat')}
        </Link>

        <div className="ml1">|</div>
        <Link
          to="/emoji"
          className="ml1 no-underline black"
        >
          {t('Servicio Emoji')}
        </Link>

        <div className="ml1">|</div>
        <Link
          to="/traductor"
          className="ml1 no-underline black"
        >
          {t('Servicio Traductor')}
        </Link>

        <div className="ml1">|</div>
        <Link
          to="/clasification"
          className="ml1 no-underline black"
        >
          {t('Servicio Clasification')}
        </Link>

        {authToken && (
          <div className="flex">
            <div className="ml1">|</div>
            <Link
              to="/create"
              className="ml1 no-underline black"
            >
              {t('submit')}
            </Link>
          </div>
        )}
      </div>

      <div className="flex flex-fixed">
        {authToken ? (
          <div
            className="ml1 pointer black"
            onClick={() => {
              localStorage.removeItem(AUTH_TOKEN);
              navigate(`/`);
            }}
          >
            logout
          </div>
        ) : (
          <Link
            to="/login"
            className="ml1 no-underline black"
          >
            {t('login')}
          </Link>
        )}

      </div>

      <div className="flex flex-fixed">
        <div className="ml1 pointer black">
          {t('select_language')}
        </div>
        <div className="ml1 pointer black"> : </div>
        <div>
          <LanguageSelect className="ml1 pointer black" />
        </div>
      </div>

    </div>
  );
};

export default Header;