import AiLayout from "./AiLayout"

const Review = () => {
  return (
    <AiLayout currentStep={3}
    title={"Review Your Itinerary"}
    subtitle={"Check Plan Made based on Your Preferences before Locking it"}
    HeaderTitle={"Here's what we Have Drafted For You"}>



    <div className="space-y-10 max-w-2xl">
      <header className="flex w-full mx-auto items-center">
        <div>
          <h2 className="font-semibold">
         यहाँ title हुनेछ
        </h2>
        <p className="text-gray-500">यहाँ subtitle हुनेछ</p>
        
        </div>
        <button className="p-1 rounded-lg hover:bg-gray-600 transition-colors">Regenerate Trip</button>
      </header>
    </div>
    </AiLayout>
  )
}

export default Review