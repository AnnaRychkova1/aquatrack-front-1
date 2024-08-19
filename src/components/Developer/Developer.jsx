import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import css from './Developer.module.css';
import Iconsvg from '../../shared/components/Icon/Icon';
import data from '../../modals/DeveloperModal/developersData';

const Developer = ({ id }) => {
  const { t } = useTranslation();
  const developer = data.find(dev => dev.id === id);
  const { link, png, pngx2, webp, webpx2 } = developer;
  const name = t(`developers.${id}.name`);
  const role = t(`developers.${id}.role`);

  if (!developer) return null;

  return (
    <>
      <div className={css.photoContainer}>
        <picture>
          <source
            type="image/webp"
            media="(max-width: 767px)"
            srcSet={`${webp} 1x, ${webpx2} 2x`}
            width="100"
            height="120"
          />
          <source
            media="(max-width: 767px)"
            srcSet={`${png} 1x, ${pngx2} 2x`}
            width="100"
            height="120"
          />
          <source
            type="image/webp"
            srcSet={`${webp} 1x, ${webpx2} 2x`}
            width="160"
            height="180"
          />
          <img
            className={css.photoDev}
            srcSet={`${png} 1x, ${pngx2} 2x`}
            src={png}
            alt={`${name}, ${role}`}
            width="160"
            height="180"
            loading="lazy"
          />
        </picture>
        <Link
          className={css.devLink}
          to={link}
          target="blank"
          rel="noopener noreferrer"
        >
          <Iconsvg iconName="linkedin" className={css.iconLinkedin}></Iconsvg>
        </Link>
      </div>

      <h3 className={css.devName}>{name}</h3>
      <p className={css.devRole}>{role}</p>
    </>
  );
};

export default Developer;
