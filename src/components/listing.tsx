interface ListingProps {
  style : string
  styles :{ [key: string]: string}
};

function Listing(props: ListingProps) {

  return (
    <>
      <div>
        { props.style }
      </div>
      <div>
        { props.styles[props.style] }
      </div>
    </>
  )
}

export default Listing
