import { Navigation } from 'lucide-react';
import s from './GeolocationStatus.module.scss';

const GeolocationStatus = ({ isGpsOn }) => {
  return (
    <div className={s.geolocationBlock}>
      <p className={s.geolocationText}>Геолокация {isGpsOn ? 'вкл' : 'откл'}</p>
      <Navigation className={'h-4 w-4 text-d'} />
    </div>
  );
};

export default GeolocationStatus;
