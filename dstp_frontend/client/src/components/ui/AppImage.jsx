const AppImage = ({ src, alt, width, height, className, priority }) => {
  return (
    <img
      src={src}
      alt={alt || ''}
      width={width}
      height={height}
      className={className}
      loading={priority ? 'eager' : 'lazy'}
    />
  );
};

export default AppImage;