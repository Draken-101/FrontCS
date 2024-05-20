import { Message } from '../atoms/Message'
import './Messages.css'
export function Messages() {
    return (
        <div className='Messages'>
            <Message className='message-left'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores ipsa consectetur vero consequuntur qui distinctio, facilis blanditiis fugiat nemo delectus illum quisquam quis ducimus incidunt sint obcaecati suscipit vel at?
                Nesciunt atque blanditiis reprehenderit eveniet, quo quasi molestiae sint culpa. Sit dicta laboriosam accusamus hic quas praesentium, similique doloremque illo? Sequi, assumenda. Reiciendis blanditiis et doloremque, laborum repudiandae nobis nihil.
                Libero, quaerat optio? Expedita nostrum perferendis fugit nam veniam minus. Alias dolore laborum necessitatibus porro sunt nostrum sint beatae totam aliquid quod. Provident aut saepe eos quo excepturi molestias adipisci.
                <span>
                    4:44
                </span>
            </Message>
            <Message className='message-right'>
                Hola
                <span>
                    4:44
                </span>
            </Message>
        </div>
    )
}