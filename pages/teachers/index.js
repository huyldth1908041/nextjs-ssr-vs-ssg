import Link from "next/link"

export default function TeachersList({teachers}) {
    return <>
        <h1>Teachers management</h1>
        {teachers && teachers.map(teacher => {
            return <div key={teacher.id}>
                <Link href={`/teachers/${teacher.id}`}>
                    <a>{teacher.name}</a>
                </Link>
            </div>
        })}
    </>
}

export async function getStaticProps() {
    try {
        const resp = await fetch("http://34.126.65.139:8080/api/v1/teachers");
        if (!resp.ok) {
            throw new Error("fetch teachers failed")
        }
        const teachers = await resp.json();
        return {props: {teachers}}
    } catch (e) {
        console.log(e.message)
        return null;
    }

}

