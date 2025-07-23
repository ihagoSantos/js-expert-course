// Example of https://javascript.info/async-iterators-generators
async function* fetchCommits(repo) {
    let url = `https://api.github.com/repos/${repo}/commits`
    while (url) {
        const response = await fetch(url, {
            headers: {
                'User-Agent': 'Our Script'
            }
        })

        const body = await response.json()

        let nextPage = response.headers.get('Link')?.match(/<(.*?)>; rel="next"/)
        nextPage = nextPage?.[1]
        url = nextPage

        for (let commit of body) {
            yield commit
        }
    }
}

(async () => {
    let count = 0;

    for await (const commit of fetchCommits('javascript-tutorial/en.javascript.info')) {
        console.log("commit author:", commit.author.login);
        if (++count == 100) { // let's stop at 100 commits
            break;
        }
    }
})();