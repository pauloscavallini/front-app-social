const formatarData = (dateStr) => {
    const date = new Date(dateStr);

    const formattedDate = new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short',
    }).format(date);

    return formattedDate;
}

export { formatarData };