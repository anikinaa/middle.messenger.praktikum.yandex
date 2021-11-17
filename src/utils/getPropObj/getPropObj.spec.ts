import { expect } from 'chai'
import { getPropObj } from './getPropObj'

describe('util getPropObj - получить свойство значение объекта по пути', () => {
    it('Пустой объект', () => {
        const val = getPropObj({}, 'a')
        expect(val).to.deep.equal({})
    })

    it('Первый уровень', () => {
        const val = getPropObj({ a: 5 }, 'a')
        expect(val).to.equal(5)
    })

    it('Третий уровень', () => {
        const val = getPropObj({
            a: {
                b: {
                    c: 5,
                },
            },
        }, 'a.b.c')
        expect(val).to.equal(5)
    })

    it('Несуществующий путь', () => {
        const val = getPropObj({
            a: {
                b: {
                    c: 5,
                },
            },
        }, 'a.d.c')
        expect(val).to.deep.equal({})
    })

    it('Неверный формат пути', () => {
        expect(() => getPropObj({}, 'a..d.c'))
            .to.throw()
    })
})
