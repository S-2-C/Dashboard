

export default function Testing({params} : {params: {id: string}}) {
    return (
        <div>
            <h1 className=" text-black">{params.id}</h1>
        </div>
    )
}