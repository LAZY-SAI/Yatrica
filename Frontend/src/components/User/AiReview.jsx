

const AiReview = ({title, subtitle}) => {
  return (
  <section className="max-w-2xl flex flex-col gap-3">
    <header className="flex p-2">
        <div>
            <h2 className="font-semibold text-xl">{title}</h2>
            <p className="text-gray-600-">{subtitle}</p>
        </div>
    </header>
    

  </section>
  )
}

export default AiReview