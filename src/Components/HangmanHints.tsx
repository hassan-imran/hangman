type HangmanHintsProps = {
    movieHints: {
        year: string;
        Runtime: string;
        Genre: string;
        IMDB_Rating: string;
        Overview: string;
        Director: string;
        Star1: string;
        Star2: string;
        Star3: string;
        Star4: string;
        No_of_Votes: string;
        Gross: string;
    };
    rank: number;
    difficulty: "easy" | "medium" | "hard" | "blind";
};

export const HangmanHints = ({ movieHints, rank, difficulty }: HangmanHintsProps) => {

    let filteredHints = Object.entries(movieHints);

    if (difficulty === "medium") {
        const hide = ["Overview", "No_of_Votes", "Director", "Gross", "Runtime"];
        filteredHints = filteredHints.filter(([key]) => !hide.includes(key));
        // Only show Star1 & Star2
        filteredHints = filteredHints.filter(([key]) => ["Star1", "Star2", "Genre", "year", "IMDB_Rating"].includes(key));
    }

    if (difficulty === "hard") {
        filteredHints = filteredHints.filter(([key]) =>
            ["Genre", "year"].includes(key)
        );
    }

    if (difficulty === "blind") {
        filteredHints = [];
    }

    return (
        <div>
            <ul>
                {difficulty !== "medium" && difficulty !== "hard" && difficulty !== "blind" && (
                    <li>Rank: {rank}</li>
                )}

                {filteredHints.map(([key, value]) => (
                    <li key={key}>
                        {key}: {value}
                    </li>
                ))}
            </ul>
        </div>
    );
};

