import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import useData from '../../hooks/useData';
import CitySunInfo from '../../components/CitySunInfo/CitySunInfo';
import WeatherContent from '../../components/WeatherContent/WeatherContent';
import Loader from '../../components/Loader/Loader';
import { getCurrentPageName } from '../../utils/getCurrentPageName';
import { ArrowLeft } from 'lucide-react';
import PageAnimation from '../../components/PageAnimation';
import s from '../../styles/SlugCity.module.scss';

const WeatherDetails = () => {
  // получение data, координат из router, текущей страницы
  const [hasError, setHasError] = useState('');
  const { data, fetchData } = useData(null, setHasError);
  const router = useRouter();
  const { city, ...rawCoords } = router.query;
  const coords = useMemo(() => rawCoords, [router.query]);
  const page = getCurrentPageName();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData(page, coords, city);
  }, [city, coords]);

  useEffect(() => {
    if (data) {
      setIsLoading(false);
    }
  }, [data]);

  return (
    <>
      {isLoading && <Loader />}
      {hasError && <p>Ошибка загрузки</p>}
      {data && (
        <PageAnimation className={s.wrapper}>
          <Link className={s.wrapperArrow} href={'/'}>
            <ArrowLeft className={s.arrow} />
          </Link>
          <CitySunInfo city={data.city} />
          <div className={s.content}>
            <WeatherContent data={data} />
          </div>
        </PageAnimation>
      )}
    </>
  );
};

export default WeatherDetails;
