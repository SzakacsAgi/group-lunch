'use client'
import { useQuery } from '@apollo/client'
import { GET_RESTAURANT_BY_ID } from '../../../query/restaurant'
import EditAddForm from '../../components/EditAddForm'
import ModalButton from '../../components/button/ModalButton'
import { useRestaurantOperations } from '../../api/useRestaurantOperations'
import { SupportedModalButtonTypes } from '../../../interface'

const EditRestaurant = ({ params }: { params: { slug: string } }) => {
  const restaurantToView = useQuery(GET_RESTAURANT_BY_ID, { variables: { restaurantId: params.slug } })
  const { sendUpdateRestaurantRequest, sendDeleteRestaurantRequest } = useRestaurantOperations()

  if (restaurantToView.loading) {
    return <div>Loading...</div>
  }
  if (restaurantToView.error) {
    return <div className='px-6'>Something went wrong, please try again later</div>
  }
  if (!restaurantToView.data.restaurant.data) {
    return <div className='px-6'>No such restaurant</div>
  }

  return (
    <div>
      <p>{`title: ${restaurantToView.data.restaurant.data.attributes.title}`}</p>
      <p>{`description: ${restaurantToView.data.restaurant.data.attributes.description}`}</p>
      <p>{`url: ${restaurantToView.data.restaurant.data.attributes.url}`}</p>
      <ModalButton
        buttonPurpose={SupportedModalButtonTypes.EDIT_RESTAURANT}
        buttonText='Edit'
        modalContent={<EditAddForm onSubmit={sendUpdateRestaurantRequest} restaurant={restaurantToView.data.restaurant.data} />}
        modalHeaderText='Edit'
      />
      <ModalButton
        buttonPurpose={SupportedModalButtonTypes.DELETE_RESTAURANT}
        buttonText='Delete'
        modalContent={<p>Are you sure you want to delete this restaurant?</p>}
        withButtons
        onSubmit={() => sendDeleteRestaurantRequest(restaurantToView.data.restaurant.data.id)}
        cancelText='Cancel'
        submitText='Delete'
      />
    </div>
  )
}

export default EditRestaurant
