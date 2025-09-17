# A partir da pasta raiz do projeto
find . -name *.test.js

# ignora a pasta node_modules. asterisco dubplicado no final para ignorar também os arquivos
find . -name *.test.js -not -path '*node_modules**'

find . -name *.js -not -path '*node_modules**'

npm i -g ipt # instalando o ipt -> pacote para trabalhar com linha de comando

find . -name *.js -not -path '*node_modules**' | ipt

# desinstala o ipt
# npm uninstall -g ipt

# volta para pasta do modulo05

# copia pasta do desafio no modulo01
cp -r ../../modulo01/aula05-tdd-project-pt4-desafio .

CONTENT="'use strict';"
find . -name *.js -not -path '*node_modules**' \
| ipt -o \
| xargs -I '{file}' sed -i -e "1s/^/$CONTENT\n/g" {file}

# -o seleciona multiplos arquivos
# xargs é usado para executar um comando para cada item retornado a partir do find.
# o xargs salva o nome do arquivo em '{file}'
# sed é uma ferramenta de substituição do unix
# -i faz uma edição deixando ele fazio nesse caso
# 1s -> primeira linha
# ^ -> primeira coluna
# substitui pelo $CONTENT
# quebrou a linha para adicionar um \n implicito


# MUDA TUDO
CONTENT="'use strict';"
find . -name *.js -not -path '*node_modules**' \
| xargs -I '{file}' sed -i -e "1s/^/$CONTENT\n/g" {file}