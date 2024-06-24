import useAppStore from '../store/store'

function MaterialsSetup() {
  const {
    materialsPairs,
    setMaterialPairs,
    fromMaterial,
    setFromMaterial,
    toMaterial,
    setToMaterial
  } = useAppStore()

  const handleFromChange = (evt: { target: { value: string } }) => {
    setFromMaterial(evt.target.value)
  }
  const handleToChange = (evt: { target: { value: string } }) => {
    setToMaterial(evt.target.value)
  }
  const handleAddPair = () => {
    if (fromMaterial && toMaterial && materialsPairs) {
      const newPair = {
        from: fromMaterial,
        to: toMaterial
      }
      materialsPairs.push(newPair)
      setMaterialPairs(materialsPairs)
    }
  }
  const handleDeleteItem = (id: number) => {
    const filtered = materialsPairs.filter((_mat, index) => id !== index)
    setMaterialPairs(filtered)
  }
  return (
    <ul className={'w-full '}>
      <li className={'flex justify-between my undeline w-full px-1'}>
        <h4>Add materials names</h4>
      </li>
      <li className={'flex text-muted justify-between'}>
        <span>Original Material:</span>
        <span>Replaced Material:</span>
      </li>
      <li className={'my-1 flex gap-2'}>
        <div className={'wrapper'}>
          <input
            className={'inputUnderline'}
            value={fromMaterial}
            onChange={(e) => handleFromChange(e)}
            type="text"
            placeholder={'Material Name'}
          />
          <span className={'line'}></span>
        </div>
        <div className={'wrapper'}>
          <input
            className={'inputUnderline'}
            value={toMaterial}
            onChange={(e) => handleToChange(e)}
            type="text"
            placeholder={'Material Name'}
          />
          <span className={'line'}></span>
        </div>
      </li>
      <li
        onClick={handleAddPair}
        className={'flex items-center cursor-pointer my-1 justify-center'}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-plus-circle"
        >
          <defs>
            <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="oooscillate-grad">
              <stop stopColor="hsl(206, 75%, 49%)" stopOpacity="1" offset="0%"></stop>
              <stop stopColor="hsl(331, 90%, 56%)" stopOpacity="1" offset="100%"></stop>
            </linearGradient>
          </defs>
          <circle stroke="url(#oooscillate-grad)" cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="16"></line>
          <line x1="8" y1="12" x2="16" y2="12"></line>
        </svg>
      </li>
      <li className={'w-full'}>
        {materialsPairs && materialsPairs.length > 0 && (
          <ul className={'w-full'}>
            <li className={'flex justify-center'}>
              <span>replaced by</span>
            </li>
            {materialsPairs.map((material, i) => {
              return (
                <li className={'w-full flex items-center justify-between'} key={i}>
                  <span className={'matNameItem'}>{material.from}</span>
                  <span>&rarr;</span>
                  <span className={'matNameItem'}>{material.to}</span>
                  <span
                    onClick={() => handleDeleteItem(i)}
                    className={'cursor-pointer accent text-lg'}
                  >
                    &times;
                  </span>
                </li>
              )
            })}
          </ul>
        )}
      </li>
    </ul>
  )
}

export default MaterialsSetup
