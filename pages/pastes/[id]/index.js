import Link from 'next/link'
const paste = ({ post }) => {
    return (
        <div>
          <h1>{post.text}</h1>
          <Link href="http://localhost:3000/">
            <a>Go home</a>
          </Link>
        </div>
    );
}

export const getStaticProps = async (context) => {
    console.log(context.params.id);
    const res = await fetch(`http://localhost:3000/api/pastes/${context.params.id}`);
    const post = await res.json();
    return {
      props: {
        post
      }
    }
  }
  
  export const getStaticPaths = async() => {
    const res = await fetch(`http://localhost:3000/api/pastes`);
    const posts = await res.json();
    const ids = posts.map((post) => post.id);
    console.log(ids);
    const paths = ids.map((id) => ({
      params: {
        id: id.toString()
      }
    }))
    return {
      paths,
      fallback: false
    }
  }

  
export default paste;