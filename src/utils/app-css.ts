


const cardStyle: React.CSSProperties = {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
};

const cardBodyStyle: React.CSSProperties = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
};


const carouselStyle: React.CSSProperties = {
    flex: 1,
};

const contentStyle: React.CSSProperties = {
    height: '200px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center' as const,
    background: '#364d79',
};


export const APP_CSS = {
    cardStyle,
    cardBodyStyle,
    carouselStyle,
    contentStyle
}