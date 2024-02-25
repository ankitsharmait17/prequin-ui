export function formatDate(inputDateString: string) {
    const inputDate = new Date(inputDateString);
    const formattedDate = inputDate.toLocaleDateString();
    return formattedDate;
}
