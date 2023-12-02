import React, {
	createContext,
	useContext,
	useState,
	ReactNode,
	useMemo,
} from "react";
import { API_ENDPOINT } from "../../constants/ENDPOINTS";
import axios from "axios";
import { RequestFormInterface } from "../../interfaces/forms.interface";

interface RequestFormContextInterface {
	status: boolean;
	result: RequestFormInterface[];
}

// Type //
type RequestFormsContextType = {
	requestForms: RequestFormContextInterface;
	setRequestForms: React.Dispatch<React.SetStateAction<RequestFormContextInterface>>;
	fetchRequestForms: (force?: boolean) => void;
};
type RequestFormsContextProviderProps = {
	children: ReactNode;
};

// Context //
const RequestFormsContext = createContext<RequestFormsContextType | undefined>(
	undefined
);

export function useContext_RequestForms() {
	const context = useContext(RequestFormsContext);
	if (context === undefined) {
		throw new Error("useContext_RequestForms is not used within its provider");
	}
	return context;
}

export function RequestFormsContextProvider({
	children,
}: Readonly<RequestFormsContextProviderProps>) {
	const [requestForms, setRequestForms] = useState<RequestFormContextInterface>({
		status: false,
		result: []
	});

	const fetchRequestForms = async (force?: boolean) => {
		if (force || (!requestForms.status && requestForms.result.length === 0)) {
			try {
				const response: { data: RequestFormContextInterface; } = await axios.get(`${API_ENDPOINT}/api/v1/forms/requestForm/getAll`);

				const reversedRequestForms: RequestFormContextInterface = {
					status: true,
					result: response.data.result.reverse()
				};

				setRequestForms(reversedRequestForms);
			} catch (error) {
				setRequestForms({
					status: false,
					result: []
				});
			}
		}
	};

	const contextValue = useMemo(
		() => ({
			requestForms,
			setRequestForms,
			fetchRequestForms,
		}),
		[requestForms, setRequestForms]
	);

	return (
		<RequestFormsContext.Provider value={contextValue}>
			{children}
		</RequestFormsContext.Provider>
	);
}
