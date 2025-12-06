import { expect, it, describe, jest, beforeEach } from "@jest/globals"
import { spyOn } from "jest-mock"
import BaseBusiness from '../src/business/base/baseBusiness.js'
import { NotImplementedException } from "../src/util/exceptions.js"

describe('BaseBusiness Test Suite', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })
    it('Should throw an error when child class doesnt implement _validateRequiredFields method', () => {
        class ConcreteClass extends BaseBusiness { }
        const concreteClass = new ConcreteClass()

        const validationError = new NotImplementedException(
            concreteClass._validateRequiredFields.name
        )
        expect(() => concreteClass.create({})).toThrow(validationError)
    })
    it('Should throw an error _validateRequiredFields returns false', () => {
        const VALIIDATION_DOESNT_SUCCEEDED = false
        class ConcreteClass extends BaseBusiness {
            _validateRequiredFields(data) {
                return VALIIDATION_DOESNT_SUCCEEDED
            }
        }
        const concreteClass = new ConcreteClass()

        const validationError = new Error('Invalid data')
        expect(() => concreteClass.create({})).toThrow(validationError)
    })
    it('Should throw an error when child class doesnt implement _create method', () => {
        const VALIIDATION_DOESNT_SUCCEEDED = true
        class ConcreteClass extends BaseBusiness {
            _validateRequiredFields(data) {
                return VALIIDATION_DOESNT_SUCCEEDED
            }
        }
        const concreteClass = new ConcreteClass()

        const validationError = new NotImplementedException(
            concreteClass._create.name
        )
        expect(() => concreteClass.create({})).toThrow(validationError)
    })
    it('Should call _validateRequiredFields and _create methods on create', () => {
        const VALIIDATION_DOESNT_SUCCEEDED = true
        class ConcreteClass extends BaseBusiness {
            _validateRequiredFields(data) {
                return VALIIDATION_DOESNT_SUCCEEDED
            }
            _create(data) {
                return { id: 1, ...data }
            }
        }
        const concreteClass = new ConcreteClass()
        const createFromBaseClassSpy = spyOn(
            BaseBusiness.prototype,
            BaseBusiness.prototype.create.name
        )
        const _validateRequiredFieldsSpy = spyOn(
            concreteClass,
            concreteClass._validateRequiredFields.name
        )
        const _createSpy = spyOn(
            concreteClass,
            concreteClass._create.name
        )
        const result = concreteClass.create({ name: 'Test' })
        expect(result).toBeTruthy()
        expect(createFromBaseClassSpy).toHaveBeenCalled()
        expect(concreteClass._validateRequiredFields).toHaveBeenCalled()
        expect(_validateRequiredFieldsSpy).toHaveBeenCalled()
        expect(_createSpy).toHaveBeenCalled()
    })
})