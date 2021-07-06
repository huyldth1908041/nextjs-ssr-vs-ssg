import Link from "next/link"
export default function Teacher({teacher}) {
   return <>
      {teacher && <div>
         <h1>{teacher.name}</h1>
         <h1>{teacher.phone}</h1>
         <h1>{teacher.email}</h1>
      </div>}
      <Link href="/teachers">
         <a>Go back</a>
      </Link>
   </>
}

export async function getStaticPaths() {
   // Return a list of possible value for id
   //ex:
   // [
   //   {
   //     params: {
   //       id: 'ssg-ssr'
   //     }
   //   },
   //   {
   //     params: {
   //       id: 'pre-rendering'
   //     }
   //   }
   // ]
   try {
      const resp = await fetch("http://34.126.65.139:8080/api/v1/teachers");
      if(!resp.ok) {
         throw new Error("fetch teachers failed")
      }
      const teachers = await resp.json();
      const paths =  teachers.map(item => {
         const params = {id: item.id.toString()}
         return {params}
      })
      return {
         paths,
         fallback: false
      }
   } catch (e) {
      console.log(e.message)
      return null;
   }
}

export async function getStaticProps({ params }) {
   // Fetch necessary data for teacher post using params.id
   const id = params.id;
   try {
      const resp = await fetch("http://34.126.65.139:8080/api/v1/teachers/".concat(id));
      if(resp.ok) {
         const teacher = await resp.json();
         return {props: {teacher}}
      }
      throw new Error("fetch teacher detail fail")
   } catch (e) {
      console.log(e.message)
      return {props: {teacher: null}};
   }
}


// export async function getServerSideProps({params}) {
//    const id = params.id;
//    try {
//       const resp = await fetch("http://34.126.65.139:8080/api/v1/teachers/".concat(id));
//       if(resp.ok) {
//          const teacher = await resp.json();
//          return {props: {teacher}}
//       }
//       throw new Error("fetch teacher detail fail")
//    } catch (e) {
//       console.log(e.message)
//       return {props: {teacher: null}};
//    }
// }