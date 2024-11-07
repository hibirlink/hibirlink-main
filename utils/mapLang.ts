export default function (langs: Array<{ name: string, type: string }>, type: string) {
    return langs?.find((lang: any) => lang?.type === type)?.name
}