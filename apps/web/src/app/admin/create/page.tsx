 "use client"
import axios from 'axios';
import { useRouter } from 'next/router';
interface ICreateEventPageProps {
}

const CreateEventPage: React.FunctionComponent<ICreateEventPageProps> = (props) => { 
 return <div>
    <div>
        <input type="text" placeholder='title event' />
    </div>
    <div>
        <input type="text" placeholder='description' />
    </div>
    <div>
        <input type="text" placeholder='Location' />
    </div>
    <div>
        <input type="text" placeholder='type event' />
    </div>
    <div>
        <select>
        <option value="status">STATUS</option>
        <option value="FREE">FREE</option>
        <option value="PAID">PAID</option>
        </select>
    </div>
    <div>
        <input type="text"placeholder='categori' />
    </div>
    <div>
        <p>
            start date
        </p>
        <input type="date"/>
    </div>
    <div>
        <p>
            end date
        </p>
        <input type="date"/>
    </div>

  </div> ;
};

export default CreateEventPage;

