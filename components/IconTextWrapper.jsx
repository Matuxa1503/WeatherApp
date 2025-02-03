const IconTextWrapper = ({ Icon, text, WindIcon = null }) => {
  return (
    <div className="flex gap-1 items-center">
      <Icon className="w-5 h-5" />
      <p>{text}</p>

      {WindIcon && <WindIcon className="w-4 h-4" />}
      {/* WindIcon использ для отображения направления ветра. 
			Добавлено сюда чтобы не создавать лишнюю компоненту */}
    </div>
  );
};

export default IconTextWrapper;
